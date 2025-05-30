
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MaterialsSectionProps {
  materials: { name: string; url: string }[];
}

const MaterialsSection = ({ materials }: MaterialsSectionProps) => {
  const { toast } = useToast();

  const handleDownload = (materialName: string) => {
    // Here you would implement the actual download logic
    toast({
      title: "Download",
      description: `Baixando: ${materialName}`,
    });
  };

  return (
    <Card className="border-violin-200">
      <CardHeader>
        <CardTitle className="text-violin-900 flex items-center">
          <Download className="w-5 h-5 mr-2" />
          Material de Apoio
        </CardTitle>
        <CardDescription>
          Baixe os materiais complementares desta aula
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {materials && materials.length > 0 ? (
          materials.map((material, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-violin-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-3">📄</span>
                <span className="text-violin-800 text-sm">{material.name}</span>
              </div>
              <Button 
                size="sm" 
                onClick={() => handleDownload(material.name)}
                className="  hover:opacity-90"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          ))
        ) : (
          <p className="text-violin-500 text-center py-4">
            Nenhum material disponível para esta aula.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MaterialsSection;
