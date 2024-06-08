import mongoose, { Schema } from "mongoose";

// create interface for User attributes
interface UserAttrs {
  email: string;
  password: string;
}

// describe properties that user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attr: UserAttrs): UserDoc;
}

// describe properties that user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// creating statics methods
UserSchema.statics.build = (attr: UserAttrs) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);

export { User };
