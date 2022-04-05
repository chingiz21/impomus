import './TrackRow.css';
import { getTrackDuration } from '../../../../../../helpers/getTrackDuration';

const TrackRow = ({track, index}) => {
    return (
        <tr key={track.track.id}>
            <td>{index + 1}</td>
            <td>{track.track.name}</td>
            <td>{track.track.artists[0].name}</td>
            <td>{getTrackDuration(track.track.duration_ms)}</td>
        </tr>
    )
}

export default TrackRow;