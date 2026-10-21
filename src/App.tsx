import { useRoute } from '@/lib/router';
import { Navbar, Footer } from '@/components/Nav';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { PartiesPage } from '@/pages/PartiesPage';
import { PartyDetailPage } from '@/pages/PartyDetailPage';
import { LeadersPage } from '@/pages/LeadersPage';
import { LeaderDetailPage } from '@/pages/LeaderDetailPage';
import { WorksPage } from '@/pages/WorksPage';
import { WorkDetailPage } from '@/pages/WorkDetailPage';
import { YojnasPage } from '@/pages/YojnasPage';
import { PromisesPage } from '@/pages/PromisesPage';
import { IncidentsPage } from '@/pages/IncidentsPage';
import { PublicMoneyPage } from '@/pages/PublicMoneyPage';
import { MediaFreedomPage } from '@/pages/MediaFreedomPage';
import { EnvironmentPage } from '@/pages/EnvironmentPage';

function App() {
  const route = useRoute();

  let page;
  switch (route.name) {
    case 'home':
      page = <HomePage />;
      break;
    case 'about':
      page = <AboutPage />;
      break;
    case 'parties':
      page = <PartiesPage />;
      break;
    case 'party':
      page = <PartyDetailPage id={route.id} />;
      break;
    case 'leaders':
      page = <LeadersPage />;
      break;
    case 'leader':
      page = <LeaderDetailPage id={route.id} />;
      break;
    case 'works':
      page = <WorksPage />;
      break;
    case 'work':
      page = <WorkDetailPage id={route.id} />;
      break;
    case 'yojnas':
      page = <YojnasPage />;
      break;
    case 'promises':
      page = <PromisesPage />;
      break;
    case 'incidents':
      page = <IncidentsPage />;
      break;
    case 'public-money':
      page = <PublicMoneyPage initialSection={route.section} />;
      break;
    case 'press-freedom':
      page = <MediaFreedomPage />;
      break;
    case 'environment':
      page = <EnvironmentPage />;
      break;
    default:
      page = <HomePage />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F5] text-[#181A19]">
      <Navbar />
      <main className="flex-1">{page}</main>
      <Footer />
    </div>
  );
}

export default App;
