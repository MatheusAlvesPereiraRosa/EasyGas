import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

const map = () => {
    return (
        <View style={styles.page}>
            <Text>Mapa</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default map
