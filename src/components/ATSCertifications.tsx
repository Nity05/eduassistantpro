
import { Award, ExternalLink } from "lucide-react";

interface Certification {
  name: string;
  platform: string;
  link: string;
}

interface ATSCertificationsProps {
  certifications: Certification[];
}

const ATSCertifications = ({ certifications }: ATSCertificationsProps) => {
  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center gap-2 mb-6">
        <Award className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Recommended Certifications</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert, index) => (
          <a 
            key={index}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border border-border rounded-lg hover:bg-secondary/10 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{cert.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{cert.platform}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ATSCertifications;
