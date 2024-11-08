export async function getAiResponse(input) {
    // Simulate AI response
    const mockResponses = [
        "Let me think about that for a moment...",
        "Here's what I found about your query.",
        "Could you please provide more details?"
    ]

    return new Promise(resolve => {
        setTimeout(() => {
            const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
            resolve(randomResponse)
        }, 3000)
    })
}