export default function TodoItem({ id, texto }) {
  return (
    <li id={id}>
      <span>{texto}</span>
    </li>
  );
}
