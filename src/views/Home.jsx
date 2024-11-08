import { useState, useEffect } from 'react'
import sendIcon from '../assets/icons/send.svg'
import { getAiResponse } from 'src/services/AiService'

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
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [loadingDots, setLoadingDots] = useState('.')

    useEffect(() => {
        let interval
        if (isLoading) {
            interval = setInterval(() => {
                setLoadingDots(prev => (prev.length < 3 ? prev + '.' : '.'))
            }, 500)
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isLoading])

    const handleSubmit = async () => {
        if (!input.trim()) return
        // Add user message
        const newMessages = [...messages, { role: 'user', content: input }]
        setMessages(newMessages)
        setInput('')
        // AI response
        setIsLoading(true)
        const aiResponse = await getAiResponse(input)
        setIsLoading(false)
        setMessages([...newMessages, { role: 'assistant', content: aiResponse }])
    }

    return (
        <Window bottomInset customColor="#0d0d0d" direction="column">
            <View padding="small" gap="10px" direction="column" grow={1} marginTop="large">
                {messages.map((message, index) => (
                    <View key={index} display="flex" direction="row" justifyContent={message.role === 'user' ? 'end' : 'start'}>
                        <View maxWidth="80%" padding="small" backgroundColor={message.role === 'user' ? 'primary-500' : 'neutral-300'} borderRadius="small">
                            <Text color={message.role === 'user' ? 'neutral-300' : 'primary-500'}>{message.content}</Text>
                        </View>
                    </View>
                ))}
                {isLoading && (
                    <View display="flex" direction="row" justifyContent="start">
                        <View maxWidth="80%" padding="small" backgroundColor="neutral-300" borderRadius="small">
                            <Text color="primary-500">EItri is forging your answer{loadingDots}</Text>
                        </View>
                    </View>
                )}
            </View>
            <View padding="small" borderColor="neutral-500" borderTopWidth="hairline" overflowY="auto">
                <View direction="row" gap="10px">
                    <View position="relative" display="flex" alignItems="center" width="100%" backgroundColor="neutral-300" borderRadius="small" height="50" borderColor="primary-500" borderWidth={isInputFocused ? "hairline" : ""}>
                        <Input
                            type="text"
                            inputMode="text"
                            value={input}
                            onChange={value => setInput(value)}
                            placeholder="Type your message..."
                            onFocus={() => setIsInputFocused(true)}
                            onBlur={() => setIsInputFocused(false)}
                            borderHidden={true}
                        />
                        <Touchable onPress={handleSubmit}>
                            <View backgroundColor="primary-500" padding="small" borderRadius="small" direction="row" gap="5px" alignItems="center">
                                <Image width={20} height={20} src={sendIcon} />
                            </View>
                        </Touchable>
                    </View>
                </View>
            </View>
        </Window>
    )
}