// C:\Users\TOMSHER\Desktop\MUHSIL WEB\NGC\ngc\src\app\segments\workspace\page.tsx

import React from 'react';
import WorkspaceIntroduction from '@/components/sections/workspace/WorkspaceIntroduction';
import CreativePossibilities from '@/components/sections/workspace/CreativePossibilities';
import WorkspaceOption from '@/components/sections/workspace/WorkspaceOption';

const WorkspacePage = () => {
  return (
    <div className="workspace-page">
      {/* Workspace Introduction Section */}
      <WorkspaceIntroduction
     />

      {/* Limitless Creative Possibilities Section */}
      <CreativePossibilities 
        />
 






      {/* Design That Works Section */}
      <WorkspaceOption />


      
    </div>
  );
};

export default WorkspacePage;
