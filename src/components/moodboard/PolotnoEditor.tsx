"use client";

import React, { useEffect, useState } from 'react';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel, DEFAULT_SECTIONS } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
import { createStore } from 'polotno/model/store';
import { observer } from 'mobx-react-lite';
import { ProductsSection } from './ProductsPanel';

const POLOTNO_API_KEY = process.env.NEXT_PUBLIC_POLOTNO_API_KEY || '';

interface PolotnoEditorProps {
  initialData?: any;
}

const PolotnoEditor: React.FC<PolotnoEditorProps> = observer(({ initialData }) => {
  const [store, setStore] = useState<any>(null);

  useEffect(() => {
    const newStore = createStore({
      key: POLOTNO_API_KEY,
      showCredit: true,
    });

    if (newStore.pages.length === 0) {
      newStore.addPage();
    }

    if (initialData) {
      try {
        newStore.loadJSON(initialData);
      } catch (error) {
        console.error('Failed to load initial data:', error);
      }
    } else {
      try {
        const selectedTemplate = sessionStorage.getItem('selectedTemplate');
        const uploadedRoomImage = sessionStorage.getItem('uploadedRoomImage');
        
        if (selectedTemplate) {
          const template = JSON.parse(selectedTemplate);
          const page = newStore.activePage;
          
          if (page && template.zones) {
            const pageWidth = Number(page.width);
            const pageHeight = Number(page.height);
            template.zones.forEach((zone: any) => {
              page.addElement({
                type: 'text',
                x: (zone.x / 100) * pageWidth,
                y: (zone.y / 100) * pageHeight,
                width: (zone.width / 100) * pageWidth,
                height: (zone.height / 100) * pageHeight,
                text: zone.label,
                fontSize: 16,
                fill: '#666666',
                align: 'center',
              });
            });
          }
        }
        
        if (uploadedRoomImage) {
          const page = newStore.activePage;
          if (page) {
            page.addElement({
              type: 'image',
              src: uploadedRoomImage,
              x: 0,
              y: 0,
              width: Number(page.width),
              height: Number(page.height),
              selectable: false,
            });
          }
        }
      } catch (error) {
        console.error('Failed to load template or room image:', error);
      }
    }

    setStore(newStore);
  }, [initialData]);

  if (!store) {
    return <div>Loading editor...</div>;
  }

  const sections = [
    DEFAULT_SECTIONS[0],
    DEFAULT_SECTIONS[1],
    DEFAULT_SECTIONS[2],
    ProductsSection,
    DEFAULT_SECTIONS[3],
    DEFAULT_SECTIONS[4],
    DEFAULT_SECTIONS[5],
  ];

  return (
    <PolotnoContainer style={{ width: '100vw', height: '100vh' }}>
      <SidePanelWrap>
        <SidePanel store={store} sections={sections} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} downloadButtonEnabled />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
});

PolotnoEditor.displayName = 'PolotnoEditor';

export default PolotnoEditor;
