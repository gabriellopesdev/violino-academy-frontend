
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface VideoLessonHeaderProps {
  lesson: {
    title: string;
    description: string;
    level: string;
    duration: string;
  };
}

const VideoLessonHeader = ({ lesson }: VideoLessonHeaderProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante':
        return 'bg-green-100 text-green-800';
      case 'Intermediário':
        return 'bg-yellow-100 text-yellow-800';
      case 'Avançado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mb-6">
      <Button asChild variant="outline" className="mb-4">
        <Link to="/dashboard">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Voltar ao Dashboard
        </Link>
      </Button>
      
      <div className="flex items-center gap-4 mb-4">
        <Badge className={getLevelColor(lesson.level)}>
          {lesson.level}
        </Badge>
        <span className="text-violin-600">{lesson.duration}</span>
      </div>
      
      <h1 className="text-3xl font-bold text-violin-900 mb-2">{lesson.title}</h1>
      <p className="text-violin-600">{lesson.description}</p>
    </div>
  );
};

export default VideoLessonHeader;
