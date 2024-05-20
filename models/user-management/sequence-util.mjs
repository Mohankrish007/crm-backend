import Sequence from './sequence-schema.mjs'; // Adjust the path as necessary

export async function getNextSequence(sequenceName) {
    try {
        const sequenceDoc = await Sequence.findByIdAndUpdate(
            sequenceName,
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );
        return sequenceDoc.sequence_value;
    } catch (error) {
        throw new Error(`Failed to get next sequence (${sequenceName}): ${error.message}`);
    }
}