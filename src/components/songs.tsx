import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Song } from "../models";

export default function Songs() {
    const [songs, setSongs] = useState<Array<Song>>([]);

    const fetchSongs = async () => {
        try {
            const res = await fetch("http://localhost:3001/getallsongs");

            if (!res.ok) {
                throw new Error(`Error: status code is ${res.status}`);
            }
            const songsList = await res.json();
            setSongs(songsList);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchSongs();
    }, [])

    return (
        <>
        <h1>Songs</h1>
        <div style={{ width: '800px', margin: 'auto' }}>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell ><b>📅 Year</b></TableCell>
                        <TableCell ><b>🎹 Band</b></TableCell>
                        <TableCell ><b>🎶 Song</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {songs.map((s) => (
                        <TableRow
                            key={s.songName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell >{s.year}</TableCell>
                            <TableCell >{s.band}</TableCell>
                            <TableCell >{s.songName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
    </>
    )
}