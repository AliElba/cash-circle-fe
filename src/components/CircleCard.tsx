import './ExploreContainer.css';

interface Props {
  name: string;
}

const CircleCard: React.FC<Props> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>
        Explore{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">
          UI Components
        </a>
      </p>
    </div>
  );
};

export default CircleCard;
