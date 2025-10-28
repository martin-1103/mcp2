/**
 * Folders Module Index
 * Main entry point for folder operations
 */
export { folderTools, listFoldersTool, createFolderTool, updateFolderTool, deleteFolderTool, getFolderDetailsTool } from './tools.js';
export { handleListFolders, handleCreateFolder, handleUpdateFolder, handleDeleteFolder, handleGetFolderDetails } from './handlers/folderHandlers.js';
export { FolderService } from './services/FolderService.js';
export * from './types.js';
