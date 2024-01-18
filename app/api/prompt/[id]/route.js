import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) return new Response("프롬프트를 찾을 수 없습니다.")

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch all prompts', { status: 500 });

    }
}

// PATCH (update)
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) return new Resoponse("프롬프트를 찾을 수 없습니다.", { status: 404 })

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 })
    }
}

// DELETE (delete)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("프롬프트가 삭제되었습니다.", { status: 200 })
    } catch (error) {
        return new Response("프롬프트 삭제에 실패했습니다.", { status: 500 })
    }
}