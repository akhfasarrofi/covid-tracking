import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoBox.css';

type TProps = {
  title: string
  cases: string
  total: string
  active: boolean
  isRed: string
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined
  img: string
}

const InfoBox: React.FC<TProps> = ({
  title,
  cases,
  total,
  active,
  isRed,
  onClick,
  img
}) => (
  <Card
    onClick={onClick}
    className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'
      }`}
  >
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>
        {cases}
      </h2>

      <Typography className="infoBox__total" color="textSecondary">
        {total} Total
      </Typography>
    </CardContent>
    <div className="infoBox__img">
      <img alt='img' src={img} />
    </div>
  </Card>
);


export default InfoBox;
