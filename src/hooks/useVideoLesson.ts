
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface VideoLessonData {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  video_url: string;
  topics: string[];
  materials: { name: string; url: string }[];
}

export const useVideoLesson = (id: string | undefined) => {
  const { toast } = useToast();
  const [lesson, setLesson] = useState<VideoLessonData | null>(null);
  const [loading, setLoading] = useState(true);

  const transformMaterials = (materials: any): { name: string; url: string }[] => {
    if (!materials || !Array.isArray(materials)) {
      return [];
    }
    
    return materials.filter((material: any) => 
      material && 
      typeof material === 'object' && 
      typeof material.name === 'string' && 
      typeof material.url === 'string'
    ).map((material: any) => ({
      name: material.name,
      url: material.url
    }));
  };

  const fetchLesson = async (lessonId: string) => {
    try {
      const { data, error } = await supabase
        .from('video_lessons')
        .select('*')
        .eq('id', lessonId)
        .single();

      if (error) {
        console.error('Error fetching lesson:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar a aula.",
          variant: "destructive",
        });
        return;
      }

      const transformedLesson: VideoLessonData = {
        id: data.id,
        title: data.title,
        description: data.description || '',
        duration: data.duration || '',
        level: data.level,
        video_url: data.video_url || '',
        topics: data.topics || [],
        materials: transformMaterials(data.materials)
      };

      setLesson(transformedLesson);
    } catch (error) {
      console.error('Error fetching lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchLesson(id);
    }
  }, [id]);

  return { lesson, loading };
};
