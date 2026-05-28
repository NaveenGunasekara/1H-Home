const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // standard encryption dependency

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true 
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'] 
  },
  role: { 
    type: String, 
    default: 'admin' 
  }
}, { timestamps: true });

// Custom method attached to the schema to verify login attempts later
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//  THE PURE ASYNC FIX (NO NEXT PARAMETER, NO NEXT() CALL)
// Using standard 'async function ()' layout ensures 'this' points to the document context correctly
UserSchema.pre('save', async function () {
  // If the password field hasn't been modified or created, stop here and return
  if (!this.isModified('password')) {
    return;
  }

  // Hash the password cleanly using async/await without callbacks
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);