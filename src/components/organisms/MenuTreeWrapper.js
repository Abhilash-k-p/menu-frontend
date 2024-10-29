import React, { useState } from 'react';
import Button from '../atoms/Button';
import MenuTree from '../molecules/MenuTree';

const MenuTreeWrapper = ({ selectedMenu, expandedNodes, setExpandedNodes }) => {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleNodeToggle = (node) => {
        setExpandedNodes((prev) => {
            const newExpanded = new Set(prev);
            if (newExpanded.has(node.id)) {
                const traverseToDelete = (node) => {
                    newExpanded.delete(node.id);
                    if (node.children) {
                        node.children.forEach(traverseToDelete);
                    }
                };
                traverseToDelete(node);
            } else {
                newExpanded.add(node.id);
            }
            return newExpanded;
        });
    };
    
    const collectAllNodeIds = (menu) => {
        const nodeIds = new Set();
        const traverseToAdd = (node) => {
            nodeIds.add(node.id);
            if (node.children) {
                node.children.forEach(traverseToAdd);
            }
        };
        traverseToAdd(menu);
        return nodeIds;
    };

    // Expands all nodes by collecting all node IDs
    const handleExpandAll = () => {
        setExpandedNodes(collectAllNodeIds(selectedMenu));
        setRefreshKey((prev) => prev + 1); // Refreshes the component
    };

    // Collapses all nodes by clearing the expandedNodes state
    const handleCollapseAll = () => {
        setExpandedNodes(new Set());
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <div>
            <div>
                {/* Expand/Collapse Buttons */}
                <Button
                    onClick={handleExpandAll}
                    label="Expand All"
                    className="mb-4 bg-gray-900 text-white font-semibold py-2 px-4 rounded-full focus:outline-none mr-4"
                />
                <Button
                    onClick={handleCollapseAll}
                    label="Collapse All"
                    className="mb-4 border border-gray-300 text-gray-600 font-semibold py-2 px-4 rounded-full focus:outline-none"
                />
            </div>

            {/* Render the MenuTree */}
            <div>
                <MenuTree
                    key={`${selectedMenu.id}-${refreshKey}-${selectedMenu?.updated_at}`}
                    menu={selectedMenu}
                    expandedNodes={expandedNodes}
                    onNodeToggle={handleNodeToggle}
                />
            </div>
        </div>
    );
};

export default MenuTreeWrapper;
