import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

  avatar : {
    type: String,
    required:false,
    default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
  },
}, {
  timestamps: true
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password , this.password);
};

userSchema.set('toJSON' , {
  transform: function(doc , ret){
    delete ret.password;
    delete ret.__v;
    return ret;
  }
});

const User = mongoose.model("User" , userSchema);

export default User;
