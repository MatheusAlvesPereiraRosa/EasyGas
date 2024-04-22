import { Button, Platform, StyleSheet } from 'react-native';

import { useState, useEffect } from 'react';

import NfcManager, { NfcTech, Ndef, TagEvent, nfcManager, NfcEvents } from 'react-native-nfc-manager';
import { Text, View } from '@/components/Themed';

const payment = () => {

    const [creditCard, setCreditCard] = useState({})
    const [isNfcSupported, setIsNfcSupported] = useState(true)
    const [message, setMessage] = useState<string>("")

    const supportsNFC = async () => {
        const supported = await NfcManager.isSupported();

        if (!supported) {
            setMessage("NFC não suportado pelo aparelho celular")

            setIsNfcSupported(false)

            return
        }

        setIsNfcSupported(true)

        await NfcManager.start()
    }

    const readNdef = async () => {
        let tag: TagEvent | null;

        if (!isNfcSupported) {
            return
        }

        try {
            await nfcManager.requestTechnology([NfcTech.Ndef])

            tag = await nfcManager.getTag()

            if (tag) {
                const status = await nfcManager.ndefHandler.getNdefStatus();

                const ndefMessage = tag.ndefMessage;

                if (ndefMessage && ndefMessage.length > 0) {
                    // Type assertion to inform TypeScript about parseMessage method
                    const parsedMessage = (Ndef as any).parseMessage(ndefMessage[0]);

                    console.log('NDEF message:', parsedMessage);
                } else {
                    console.log('No NDEF message found on the tag');
                }

                if (Platform.OS = "ios") {
                    await nfcManager.setAlertMessageIOS("TAG detectada...")

                    console.log(tag, status)
                } else {
                    await nfcManager.setAlertMessage("TAG detectada")

                    console.log(tag, status)
                }
            }

        } catch (err) {

            console.log(err)

        } finally {
            nfcManager.cancelTechnologyRequest()
        }
    }

    useEffect(() => {
        supportsNFC()

        return () => {
            nfcManager.setEventListener(NfcEvents.DiscoverTag, null)
            nfcManager.setEventListener(NfcEvents.SessionClosed, null)
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selecione seu cartão</Text>

            {isNfcSupported === false &&
                <Text>{message}</Text>
            }

            {isNfcSupported === true &&
                <Button title='Ler NFC' onPress={() => readNdef} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    btn: {
        marginTop: 15,
        padding: 10,
    }
});

export default payment
