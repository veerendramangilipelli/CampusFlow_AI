import { FiInbox } from 'react-icons/fi';

export default function EmptyState({ icon: Icon = FiInbox, title = 'Nothing here yet', text, action }) {
  return (
    <div className="empty">
      <Icon aria-hidden="true" />
      <h4>{title}</h4>
      {text && <p>{text}</p>}
      {action && <div className="mt-16">{action}</div>}
    </div>
  );
}
