import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, '프롬프트를 입력해주세요.']
    },
    tag: {
        type: String,
        required: [true, '태그를 입력해주세요.']
    }
})

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt