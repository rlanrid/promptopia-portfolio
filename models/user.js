import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, '이메일이 이미 존재합니다!'],
        required: [true, '이메일을 확인해주세요!'],
    },
    username: {
        type: String,
        required: [true, '이름을 확인해주세요!'],
        match: [/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "영숫자 3~20글자만 가능합니다."]
    },
    image: {
        type: String,
    }
});

const User = models.User || model("User", UserSchema);

export default User;