import { useRef } from 'react';
import WorkspaceLayout from '../../../components/workspace/WorkspaceLayout';

export default function InvoicePage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <WorkspaceLayout title="Invoice Generator" subtitle="Create and manage invoices">
      <div className="w-full overflow-auto">
        <div 
          className="w-full min-w-[800px]"
          style={{
            transform: 'scale(0.6)',
            transformOrigin: 'top left',
            width: '166.67%', // compensate for scale
            height: 'calc((100vh - 200px) / 0.6)'
          }}
        >
          <iframe
            ref={iframeRef}
            src="/src/pages/workspace/invoice/invoice-generator.html"
            className="w-full h-full border-0"
            style={{ minHeight: '800px' }}
            title="Invoice Generator"
          />
        </div>
      </div>
    </WorkspaceLayout>
  );
}
