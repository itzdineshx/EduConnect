import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Save, Download, Share, Trash, Search, Pencil, Eye, EyeOff, Lock, Unlock, Network, Circle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { mockMindMaps, mockUsers } from '../data/mockData';
import { Badge } from '../components/ui/Badge';

export function MindMap() {
  // Current user - in a real app would come from auth context
  const currentUser = mockUsers[0]; // Alex (student)
  
  const [activeMap, setActiveMap] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('list'); // 'list' or 'editor'
  const [currentEditingMap, setCurrentEditingMap] = useState<any>(null);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [editingNodeLabel, setEditingNodeLabel] = useState<string>('');
  const [editingMapTitle, setEditingMapTitle] = useState<string>('');
  const [selectedShape, setSelectedShape] = useState('circle'); // Default shape
  const [selectedColor, setSelectedColor] = useState('primary'); // Default color
  
  // Create new blank mind map
  const createNewMindMap = () => {
    const newMap = {
      id: `map-${Date.now()}`,
      title: 'New Mind Map',
      description: '',
      ownerId: currentUser.id,
      collaborators: [],
      nodes: [], // Start with an empty nodes array for manual creation
      edges: [], // Start with an empty edges array for manual creation
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublic: false
    };
    setCurrentEditingMap(newMap);
    setView('editor');
    setSelectedNodes([]); // Clear selected nodes
    setEditingMapTitle('New Mind Map'); // Initialize title state
  };
  
  // Filter mind maps based on search term
  const filteredMaps = mockMindMaps.filter(
    map => 
      map.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      map.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get the selected mind map
  const selectedMap = activeMap 
    ? mockMindMaps.find(map => map.id === activeMap) 
    : null;

  // Set active map and switch to editor view
  const selectMapForEditing = (mapId: string) => {
    const mapToEdit = mockMindMaps.find(map => map.id === mapId);
    if (mapToEdit) {
      setActiveMap(mapId);
      setCurrentEditingMap(mapToEdit);
      setView('editor');
      setSelectedNodes([]); // Clear selected nodes when loading an existing map
      setEditingMapTitle(mapToEdit.title); // Initialize title state from existing map
    }
  };

  // Add a new node to the current map
  const addNode = (x: number, y: number) => {
    if (!currentEditingMap) return;

    const newNode = {
      id: `node-${Date.now()}`,
      label: 'New Node',
      position: { x, y },
      type: 'custom', // Use a generic type for custom nodes
      shape: selectedShape,
      color: selectedColor,
    };

    setCurrentEditingMap({
      ...currentEditingMap,
      nodes: [...currentEditingMap.nodes, newNode],
      updatedAt: new Date(),
    });
  };

  // Add an edge between two selected nodes
  const addEdge = () => {
    if (selectedNodes.length !== 2 || !currentEditingMap) return;

    const [sourceId, targetId] = selectedNodes;

    // Prevent creating duplicate edges or edges from a node to itself
    const edgeExists = currentEditingMap.edges.some(
      (edge: any) =>
        (edge.source === sourceId && edge.target === targetId) ||
        (edge.source === targetId && edge.target === sourceId) ||
        sourceId === targetId
    );

    if (edgeExists) {
      setSelectedNodes([]); // Clear selection if edge already exists or is invalid
      return;
    }

    const newEdge = {
      id: `edge-${Date.now()}`,
      source: sourceId,
      target: targetId,
    };

    setCurrentEditingMap({
      ...currentEditingMap,
      edges: [...currentEditingMap.edges, newEdge],
      updatedAt: new Date(),
    });

    setSelectedNodes([]); // Clear selected nodes after creating edge
  };

  // Save the current mind map
  const saveMindMap = () => {
    if (!currentEditingMap) {
      console.log('Save attempted, but currentEditingMap is null.');
      // Optionally, show a notification to the user
      return;
    }
    console.log('Save button clicked. currentEditingMap before save:', currentEditingMap);

    const updatedMap = {
      ...currentEditingMap,
      title: editingMapTitle, // Save the edited title
      updatedAt: new Date(),
    };

    // Find index of the map in mock data or -1 if new
    const existingMapIndex = mockMindMaps.findIndex(map => map.id === updatedMap.id);

    if (existingMapIndex > -1) {
      // Update existing map
      console.log('Updating existing map at index:', existingMapIndex, 'with data:', updatedMap);
      mockMindMaps[existingMapIndex] = updatedMap;
    } else {
      // Add as a new map
      console.log('Adding new map with data:', updatedMap);
      mockMindMaps.push(updatedMap);
    }

    setCurrentEditingMap(updatedMap); // Update the editing map state
    // Optionally, provide user feedback (e.g., notification)
    console.log('Mind map saved:', updatedMap.title);
    console.log('Mind map state after save:', currentEditingMap); // Log state after potential update
    console.log('mockMindMaps array after save:', mockMindMaps); // Log the mock data array
    setView('list'); // Switch back to list view after saving
    // You might want to add a success notification here as well
  };

  // Save node label after editing
  const saveNodeLabel = (nodeId: string, newLabel: string) => {
    setCurrentEditingMap((prevMap: any) => ({
      ...prevMap,
      nodes: prevMap.nodes.map((node: any) => 
        node.id === nodeId ? { ...node, label: newLabel } : node
      ),
      updatedAt: new Date(),
    }));
    setEditingNodeId(null);
    setEditingNodeLabel('');
  };

  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">MindMap Master</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">Create and collaborate on visual mind maps</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button variant="primary" onClick={createNewMindMap}>
            <Plus className="h-4 w-4 mr-2" />
            New Mind Map
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      {view === 'list' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="mb-4 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search mind maps..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Your Mind Maps</h3>
              <div className="space-y-2 mb-6">
                {filteredMaps
                  .filter(map => map.ownerId === currentUser.id)
                  .map((map) => (
                    <button
                      key={map.id}
                      className={`w-full text-left p-3 rounded-md transition-colors ${
                        activeMap === map.id
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => selectMapForEditing(map.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{map.title}</span>
                        {map.isPublic ? (
                          <Unlock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                        {map.description || 'No description'}
                      </p>
                    </button>
                  ))}
              </div>
              
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Shared With You</h3>
              <div className="space-y-2">
                {filteredMaps
                  .filter(map => 
                    map.ownerId !== currentUser.id && 
                    (map.collaborators.includes(currentUser.id) || map.isPublic)
                  )
                  .map((map) => {
                    const owner = mockUsers.find(u => u.id === map.ownerId)!;
                    
                    return (
                      <button
                        key={map.id}
                        className={`w-full text-left p-3 rounded-md transition-colors ${
                          activeMap === map.id
                            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => selectMapForEditing(map.id)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{map.title}</span>
                          {map.isPublic ? (
                            <Unlock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          ) : (
                            <Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          )}
                        </div>
                        <div className="flex items-center mt-1">
                          <Avatar 
                            src={owner.avatar} 
                            alt={owner.name} 
                            size="sm" 
                          />
                          <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                            {owner.name}
                          </span>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
          
          {/* Main Content - Selected Map View */}
          <div className="lg:col-span-3">
            {selectedMap ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {selectedMap.title}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {selectedMap.description || 'No description'}
                        </p>
                      </div>
                      <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" onClick={() => selectMapForEditing(selectedMap.id)}>
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => console.log('Share clicked for map:', selectedMap.id)}>
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => console.log('Export clicked for map:', selectedMap.id)}>
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-4">
                      <div className="flex -space-x-2">
                        {/* Owner */}
                        {(() => {
                          const owner = mockUsers.find(u => u.id === selectedMap.ownerId)!;
                          return (
                            <Avatar 
                              key={owner.id}
                              src={owner.avatar} 
                              alt={owner.name} 
                              size="sm"
                              className="border-2 border-white dark:border-gray-800"
                            />
                          );
                        })()}
                        
                        {/* Collaborators */}
                        {selectedMap.collaborators.map(collabId => {
                          const collaborator = mockUsers.find(u => u.id === collabId)!;
                          return (
                            <Avatar 
                              key={collaborator.id}
                              src={collaborator.avatar} 
                              alt={collaborator.name} 
                              size="sm"
                              className="border-2 border-white dark:border-gray-800"
                            />
                          );
                        })}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                        {selectedMap.collaborators.length + 1} collaborators
                      </span>
                      
                      <div className="ml-auto flex items-center">
                        <Badge 
                          variant={selectedMap.isPublic ? 'primary' : 'outline'}
                          className="flex items-center"
                        >
                          {selectedMap.isPublic ? (
                            <>
                              <Eye className="h-3 w-3 mr-1" />
                              Public
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-3 w-3 mr-1" />
                              Private
                            </>
                          )}
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-4">
                          Last updated: {new Date(selectedMap.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mind Map Canvas - Display Only */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-[500px] rounded-b-lg relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 800 500">
                        {/* Nodes */}
                        {selectedMap.nodes.map((node) => {
                          const nodeColors: Record<string, string> = {
                            main: 'fill-primary-200 stroke-primary-600 dark:fill-primary-900 dark:stroke-primary-400',
                            sub: 'fill-secondary-200 stroke-secondary-600 dark:fill-secondary-900 dark:stroke-secondary-400',
                            leaf: 'fill-accent-200 stroke-accent-600 dark:fill-accent-900 dark:stroke-accent-400',
                          };
                          
                          return (
                            <g key={node.id} transform={`translate(${node.position.x}, ${node.position.y})`}>
                              <ellipse 
                                rx={node.type === 'main' ? 80 : 60} 
                                ry={30} 
                                className={nodeColors[node.type]}
                                strokeWidth={2}
                              />
                              <text 
                                textAnchor="middle" 
                                dominantBaseline="middle"
                                className="fill-gray-900 dark:fill-gray-100 text-sm font-medium"
                              >
                                {node.label}
                              </text>
                            </g>
                          );
                        })}
                        
                        {/* Edges */}
                        {selectedMap.edges.map((edge) => {
                          const source = selectedMap.nodes.find(n => n.id === edge.source)!;
                          const target = selectedMap.nodes.find(n => n.id === edge.target)!;
                          
                          return (
                            <g key={edge.id}>
                              <path 
                                d={`M ${source.position.x} ${source.position.y} L ${target.position.x} ${target.position.y}`}
                                className="stroke-gray-400 dark:stroke-gray-600"
                                strokeWidth={2}
                                fill="none"
                              />
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                {...fadeIn}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center"
              >
                <div className="mx-auto w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                  <Network className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No mind map selected</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mt-2 mb-6">
                  Select a mind map from the sidebar or create a new one to get started.
                </p>
                <Button variant="primary" onClick={createNewMindMap}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Mind Map
                </Button>
              </motion.div>
            )}
            
            {/* Recent Activities */}
            {selectedMap && (
              <div className="mt-8">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">Recent Activities</h3>
                <Card>
                  <CardContent className="p-4 divide-y divide-gray-200 dark:divide-gray-700">
                    <div className="py-3 flex items-start">
                      <Avatar 
                        src={mockUsers[1].avatar} 
                        alt={mockUsers[1].name} 
                        size="sm" 
                      />
                      <div className="ml-3">
                        <p className="text-sm text-gray-900 dark:text-white">
                          <span className="font-medium">{mockUsers[1].name}</span> added a new node "Quantum Mechanics"
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Today at 2:30 PM
                        </p>
                      </div>
                    </div>
                    <div className="py-3 flex items-start">
                      <Avatar 
                        src={mockUsers[0].avatar} 
                        alt={mockUsers[0].name} 
                        size="sm" 
                      />
                      <div className="ml-3">
                        <p className="text-sm text-gray-900 dark:text-white">
                          <span className="font-medium">{mockUsers[0].name}</span> connected "Mechanics" to "Electromagnetism"
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Yesterday at 11:15 AM
                        </p>
                      </div>
                    </div>
                    <div className="py-3 flex items-start">
                      <Avatar 
                        src={mockUsers[1].avatar} 
                        alt={mockUsers[1].name} 
                        size="sm" 
                      />
                      <div className="ml-3">
                        <p className="text-sm text-gray-900 dark:text-white">
                          <span className="font-medium">{mockUsers[1].name}</span> added notes to "Physics" node
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          3 days ago
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Mind Map Editor View */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        >
          {/* Tools Sidebar Placeholder */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tools</h3>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start" onClick={() => addNode(100, 100)}>
                <Circle className="h-4 w-4 mr-2" />
                Add Node
              </Button>
            </div>
            
            {/* Shape Selection */}
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Shapes</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={selectedShape === 'circle' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedShape('circle')}
                  className="justify-center"
                >
                  Circle
                </Button>
                <Button 
                  variant={selectedShape === 'rectangle' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedShape('rectangle')}
                  className="justify-center"
                >
                  Square
                </Button>
              </div>
            </div>

            {/* Color Selection */}
            <div className="mt-6">
               <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Colors</h4>
               <div className="grid grid-cols-3 gap-2">
                 <div 
                   className={`h-8 rounded cursor-pointer bg-primary-500 ${selectedColor === 'primary' ? 'ring-2 ring-offset-2 ring-primary-500' : ''}`}
                   onClick={() => setSelectedColor('primary')}
                 ></div>
                 <div 
                   className={`h-8 rounded cursor-pointer bg-secondary-500 ${selectedColor === 'secondary' ? 'ring-2 ring-offset-2 ring-secondary-500' : ''}`}
                   onClick={() => setSelectedColor('secondary')}
                 ></div>
                 <div 
                   className={`h-8 rounded cursor-pointer bg-accent-500 ${selectedColor === 'accent' ? 'ring-2 ring-offset-2 ring-accent-500' : ''}`}
                   onClick={() => setSelectedColor('accent')}
                 ></div>
               </div>
            </div>
            
            <div className="mt-6 space-y-4">
               <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Connections</h4>
                <Button variant="outline" className="w-full justify-start" onClick={addEdge} disabled={selectedNodes.length !== 2}>
                   <Plus className="h-4 w-4 mr-2" />
                    Connect Selected ({selectedNodes.length}/2)
                </Button>
            </div>
          </div>

          {/* Editor Canvas and AI Panel */}
          <div className="lg:col-span-3">
            {/* Mind Map Title Input */}
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Mind Map Title"
                value={editingMapTitle}
                onChange={(e) => setEditingMapTitle(e.target.value)}
                className="text-xl font-semibold"
              />
            </div>

            {/* Mind Map Canvas - Editable */}
            <div
              className="bg-gray-50 dark:bg-gray-900 min-h-[500px] rounded-lg shadow-md relative p-4"
              onClick={(e) => {
                // Add node on canvas click (get coordinates relative to the canvas)
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                addNode(x, y);
              }}
            >
               {/* Whiteboard/Canvas implementation will go here */}
               <p className="text-gray-600 dark:text-gray-400 text-sm">Click on the canvas to add a node, or use the tools sidebar.</p>
               {/* Render manually created nodes and edges here */}
               {currentEditingMap?.nodes.map((node: any) => (
                 <div
                   key={node.id}
                   style={{ position: 'absolute', left: node.position.x, top: node.position.y, transform: 'translate(-50%, -50%)' }}
                   className={`w-32 h-12 flex items-center justify-center text-white text-sm cursor-pointer 
                    ${node.shape === 'circle' ? 'rounded-full' : 'rounded-lg'} 
                    ${node.color === 'primary' ? 'bg-primary-500' : node.color === 'secondary' ? 'bg-secondary-500' : 'bg-accent-500'}
                    ${selectedNodes.includes(node.id) ? 'ring-2 ring-blue-500' : ''}
                   `}
                   onClick={(e) => {
                     e.stopPropagation(); // Prevent canvas click event when clicking on a node
                     if (editingNodeId !== node.id) {
                       setSelectedNodes(prev => 
                         prev.includes(node.id) ? prev.filter(id => id !== node.id) : [...prev, node.id].slice(-2) // Allow selecting up to 2 nodes
                       );
                     }
                   }}
                   onDoubleClick={() => {
                     setEditingNodeId(node.id);
                     setEditingNodeLabel(node.label);
                   }}
                 >
                   {editingNodeId === node.id ? (
                     <Input
                       type="text"
                       value={editingNodeLabel}
                       onChange={(e) => setEditingNodeLabel(e.target.value)}
                       onBlur={() => saveNodeLabel(node.id, editingNodeLabel)}
                       onKeyPress={(e) => {
                         if (e.key === 'Enter') {
                           saveNodeLabel(node.id, editingNodeLabel);
                         }
                       }}
                       autoFocus
                       className="w-full h-full text-center bg-primary-600 text-white rounded-lg border-none focus:ring-0 text-sm px-2"
                       style={{ padding: 0, margin: 0, height: '100%' }}
                     />
                   ) : (
                     <span className="truncate px-2">{node.label || 'Node'}</span>
                   )}
                 </div>
               ))}
               {/* Basic Edge Rendering Placeholder */}
               {/* This would require SVG lines based on node positions, which is complex without a library */}
               {currentEditingMap?.edges.map((edge: any) => {
                 const sourceNode = currentEditingMap.nodes.find((n: any) => n.id === edge.source);
                 const targetNode = currentEditingMap.nodes.find((n: any) => n.id === edge.target);
                 
                 if (!sourceNode || !targetNode) return null; // Don't render invalid edges

                 // Basic line placeholder - requires more complex SVG/canvas drawing for proper rendering
                 // To draw lines on an SVG overlaid on the div, we'd need to adjust coordinates.
                 // For simplicity with absolute positioning of nodes, we'll render SVG inside the canvas div.
                 return (
                   <svg key={edge.id} className="absolute inset-0 w-full h-full pointer-events-none">
                     <line 
                       x1={sourceNode.position.x} 
                       y1={sourceNode.position.y} 
                       x2={targetNode.position.x} 
                       y2={targetNode.position.y} 
                       stroke="#6b7280" 
                       strokeWidth="2"
                     />
                   </svg>
                 );
               })}
            
               {/* Save/Share Controls */}
               <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 flex space-x-3">
                 <Button variant="outline" size="sm" onClick={saveMindMap}>
                    <Save className="h-4 w-4" />
                     Save
                  </Button>
                 <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-1" />
                    Share
                 </Button>
               </div>

            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}