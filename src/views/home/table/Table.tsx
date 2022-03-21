import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import numeral from 'numeral';

type TProps = {
  countries: any
}

interface ICountry {
  country: number
  todayCases: number
  todayDeaths: number
  todayRecovered: number
  cases: number
  deaths: number
  recovered: number
}

const Tables: React.FC<TProps> = ({ countries }) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }}>
      <TableHead>
        <TableRow>
          <TableCell>Country</TableCell>
          <TableCell align="center">Today Cases</TableCell>
          <TableCell align="center">Today Deaths</TableCell>
          <TableCell align="center">Today Recovered</TableCell>
          <TableCell align="center">Total Deaths</TableCell>
          <TableCell align="center">Total Recovered</TableCell>
          <TableCell align="center">Cases</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {countries.map((data: ICountry, idx: number) => (
          <TableRow
            key={idx}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {data.country}
            </TableCell>
            <TableCell align="center">{numeral(data.todayCases).format("0,0")}</TableCell>
            <TableCell align="center">{numeral(data.todayDeaths).format("0,0")}</TableCell>
            <TableCell align="center">{numeral(data.todayRecovered).format("0,0")}</TableCell>
            <TableCell align="center">{numeral(data.deaths).format("0,0")}</TableCell>
            <TableCell align="center">{numeral(data.recovered).format("0,0")}</TableCell>
            <TableCell align="center">{numeral(data.cases).format("0,0")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);


export default Tables