module.exports = mongoose => {
  const User = mongoose.model(
    "User",
    mongoose.Schema(
      {
        username: String,
        email: String,
        phone: String,
        about: String,
        expiresAt: {
          type: Date,
          required: true,
          index: { expireAfterSeconds: 0 },
        },
      },
      { timestamps: true },
    )
  );
  return User;
};