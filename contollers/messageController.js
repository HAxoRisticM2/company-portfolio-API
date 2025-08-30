const Message = require("../models/messageModel");
const APIFeatures = require("../utils/APIfeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// @desc    Get all messages with counts for admin panel
// @route   GET /api/messages
// @access  Private/Admin
exports.getMessages = catchAsync(async (req, res, next) => {
  // 1. Get the paginated/filtered list using the APIFeatures logic
  const features = new APIFeatures(Message.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const messages = await features.query;

  // 2. Get the counts for the admin UI (using the same filter from the query)
  const baseFilter = features.query.getFilter(); // This gets the filter object after .filter() was applied

  const totalCount = await Message.countDocuments(baseFilter);
  const newCount = await Message.countDocuments({
    ...baseFilter,
    status: "new",
  });
  const readCount = await Message.countDocuments({
    ...baseFilter,
    status: "read",
  });
  const repliedCount = await Message.countDocuments({
    ...baseFilter,
    status: "replied",
  });
  const closedCount = await Message.countDocuments({
    ...baseFilter,
    status: "closed",
  });

  // 3. Send the enhanced response
  res.status(200).json({
    status: "success",
    results: messages.length, // Number of docs on THIS page
    pagination: {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 100,
      total: totalCount, // Total docs matching the filter
    },
    counts: {
      new: newCount,
      read: readCount,
      replied: repliedCount,
      closed: closedCount,
      total: totalCount,
    },
    data: {
      items: messages,
    },
  });
});

// @desc    Create a new message from contact form
// @route   POST /api/messages
// @access  Public
exports.createMessage = catchAsync(async (req, res, next) => {
  const newMessage = await Message.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      item: newMessage,
    },
  });
});

// @desc    Update a message (status, notes)
// @route   PATCH /api/messages/:id
// @access  Private/Admin
exports.updateMessage = catchAsync(async (req, res, next) => {
  // Find the message first to handle notes
  const message = await Message.findById(req.params.id);
  if (!message) {
    return next(new AppError("No message found with that ID", 404));
  }

  // Handle adding a new note
  if (req.body.note && req.body.note.trim() !== "") {
    message.notes.push({
      note: req.body.note.trim(),
      createdBy: "Admin User", // Replace with req.user.name later from auth middleware
    });
  }

  // Handle other updates (status, assignedTo, etc.)
  // Remove 'note' from req.body to avoid trying to save it directly to the root
  const { note, ...updateData } = req.body;
  Object.assign(message, updateData);

  const updatedMessage = await message.save();

  res.status(200).json({
    status: "success",
    data: {
      item: updatedMessage,
    },
  });
});

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
exports.deleteMessage = catchAsync(async (req, res, next) => {
  const doc = await Message.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with this ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
