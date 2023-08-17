const ProjectItem = ({
  title,
  description
}: {
  title: string;
  description: string;
}) => {
  return (
    <li>
      <h4>{title.toUpperCase()}</h4>
      <p>{description ? description : 'No description'}</p>
    </li>
  );
};

export default ProjectItem;
