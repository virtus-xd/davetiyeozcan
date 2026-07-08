import InvitationRenderer from '@/components/InvitationRenderer';
import { invitation } from '@/data/invitation';

export default function Home() {
  return <InvitationRenderer data={invitation} />;
}
