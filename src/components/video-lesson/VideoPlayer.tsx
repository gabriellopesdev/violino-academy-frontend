
import { Card, CardContent } from '@/components/ui/card';

interface VideoPlayerProps {
  lesson: {
    video_url: string;
    title: string;
    topics: string[];
  };
}

const VideoPlayer = ({ lesson }: VideoPlayerProps) => {
  return (
    <Card className="border-violin-200">
      <CardContent className="p-0">
        <div className="aspect-video bg-gray-900 rounded-t-lg">
          {lesson.video_url ? (
            <iframe
              className="w-full h-full rounded-t-lg"
              src={lesson.video_url}
              title={lesson.title}
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <p>Vídeo não disponível</p>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-violin-900 mb-4">Conteúdo da Aula</h3>
          {lesson.topics && lesson.topics.length > 0 ? (
            <ul className="space-y-2">
              {lesson.topics.map((topic, index) => (
                <li key={index} className="flex items-center text-violin-700">
                  <span className="w-2 h-2 bg-violin-400 rounded-full mr-3"></span>
                  {topic}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-violin-600">Conteúdo em desenvolvimento.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
