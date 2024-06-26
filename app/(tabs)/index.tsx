import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

const Home = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seja bem-vindo ao EasyGas!</Text>
            
            <Text style={styles.desc}>Selecione uma das telas abaixo para navegar no mapa ou para pagar utilizando seu Cartão NFC</Text>
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
        fontSize: 24,
        fontWeight: 'bold',
    },
    desc: {
        fontSize: 18,
        marginTop: 50,
        marginHorizontal: 40,
        textAlign: 'center',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

export default Home
