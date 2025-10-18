import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../utils/colors';
import { getProgressColor } from "../../utils/getProgressColor";
import QuizProgressBar from './QuizProgressBar';

export default function TileLabel({ title, showProgress, progress})
{
    const percentage = Math.round(progress * 100);
    const percentColor = getProgressColor(progress);

    return (
        <View style={styles.container}>
            {showProgress ? (
                <>
                    <QuizProgressBar progress={progress}/>
                    <View style={styles.row}>
                        <Text style={styles.text}>{title}</Text>
                        <Text style={[styles.text, styles.percent, { color: percentColor }]}>{percentage}%</Text>
                    </View>
                </>
            ):(
                <Text style={styles.text}>{title}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: Colors.background,
        alignItems: 'center',
    },

    row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
    },

    text: {
        paddingVertical: 6,
        fontSize: 16,
        fontFamily: 'Montserrat',
        letterSpacing: 0.1,
        fontWeight: '500',
        textAlign: 'center',
        color: Colors.textPrimary,
    },

    percent: {
        fontWeight: '600',
    },

});