export default function Home() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Olá! Como posso te ajudar?" },
        { role: 'assistant', content: "Você pode me fazer uma pergunta?" },
        { role: 'user', content: "Qual é o seu nome?" },
        { role: 'assistant', content: "Meu nome é NikeBot!" },
        { role: 'user', content: "O que você faz?" },
        { role: 'assistant', content: "Eu sou um assistente virtual que pode te ajudar a encontrar produtos da Nike! Você pode me perguntar o que quiser!" },
        { role: 'user', content: "Gostaria de saber como posso encontrar um tênis para esportes de alta intensidade" },
        { role: 'assistant', content: "Você pode me fazer uma pergunta?" },
    ])
    const [input, setInput] = useState('')

    // Mock responses for demonstration
    const mockResponses = [
        "I can help you with that!",
        "That's an interesting question.",
        "Let me think about that for a moment...",
        "Here's what I found about your query.",
        "Could you please provide more details?"
    ]

    const handleSubmit = () => {
        if (!input.trim()) return

        // Add user message
        const newMessages = [...messages, { role: 'user', content: input }]
        setMessages(newMessages)
        setInput('')

        // Simulate AI response
        setTimeout(() => {
        const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
        setMessages([...newMessages, { role: 'assistant', content: randomResponse }])
        }, 1000)
    }

    return (
        <Window bottomInset customColor="#0d0d0d" direction="column">
            <View padding="small" gap="10px" direction="column" grow={1} marginTop="large">
                {messages.map((message, index) => (
                    <View key={index} display="flex" direciton="row" justifyContent={message.role === 'user' ? 'end' : 'start'}>
                        <View maxWidth="80%" padding="small" backgroundColor={message.role === 'user' ? 'primary-500' : 'neutral-300'} borderRadius="small">
                            <Text color={message.role === 'user' ? 'neutral-300' : 'primary-500'}>{message.content}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View padding="small" border="neutral-100" borderTopWidth="hairline" overflowY="auto">
                <View direction="row" gap="10px">
                    <View position="relative" display="flex" alignItems="center" width="100%">
                        <Input
                            type="text"
                            inputMode="text"
                            value={input}
                            onChange={value => setInput(value)}
                            placeholder="Digite sua mensagem..."    
                        />
                        <Touchable onPress={handleSubmit}>
                            <View customColor="#FFFFFF" padding="small" borderRadius="small" direction="row" gap="5px" alignItems="center">
                                <Text color="neutral-100">Enviar</Text>
                                {/* <Image width={20} height={20} src={starIcon} /> */}
                            </View>
                        </Touchable>
                    </View>
                </View>
            </View>
        </Window>
    )
}

