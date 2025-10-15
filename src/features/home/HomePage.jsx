import HeroSection from './sections/HeroSection'; // default export
import SegmentsSection from './sections/SegmentsSection'; // default export
import { CollectionsSection } from './sections/CollectionsSection'; // named export
import ColorsSection from './sections/ColorsSection';
import ProjectsSection from './sections/ProjectsSection';
import NewsletterSection from './sections/NewsletterSection';
import NewCollectionsSection from './sections/NewCollectionsSection';
import InstockCollectionSection from './sections/InstockCollectionSection';
import MoodboardSection from './sections/MoodboardSection';
import InstagramFeedSection from './sections/InstagramFeedSection';



const HomePage = () => (
  <>
    <HeroSection />
    <SegmentsSection />
    <CollectionsSection />
    <MoodboardSection /> 
    <NewCollectionsSection />
    <InstockCollectionSection />
    <ColorsSection />
    <ProjectsSection />
    <InstagramFeedSection /> 
    {/* <NewsletterSection /> */}
  </>
);

export default HomePage;
