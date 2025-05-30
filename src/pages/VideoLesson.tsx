
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoPlayer from '../components/video-lesson/VideoPlayer';
import MaterialsSection from '../components/video-lesson/MaterialsSection';
import QuickActionsSection from '../components/video-lesson/QuickActionsSection';
import ProgressSection from '../components/video-lesson/ProgressSection';
import VideoLessonHeader from '../components/video-lesson/VideoLessonHeader';
import VideoLessonSkeleton from '../components/video-lesson/VideoLessonSkeleton';
import { useVideoLesson } from '../hooks/useVideoLesson';

const VideoLesson = () => {
  const { id } = useParams();
  const { lesson, loading } = useVideoLesson(id);

  if (loading) {
    return <VideoLessonSkeleton />;
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-violin-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-violin-900 mb-4">Aula não encontrada</h1>
            <Button asChild>
              <Link to="/dashboard">Voltar ao Dashboard</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violin-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <VideoLessonHeader lesson={lesson} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <VideoPlayer lesson={lesson} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <MaterialsSection materials={lesson.materials} />
            <QuickActionsSection />
            <ProgressSection />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VideoLesson;
