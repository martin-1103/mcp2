/**
 * Folder Service
 * Handles folder-related operations with backend
 */
import { ListFoldersRequest, ListFoldersResponse, CreateFolderRequest, CreateFolderResponse, UpdateFolderRequest, UpdateFolderResponse, MoveFolderRequest, MoveFolderResponse, DeleteFolderResponse, FolderTreeNode, Folder, FolderStats } from '../types.js';
export declare class FolderService {
    private httpClient;
    private baseUrl;
    constructor(baseUrl: string, token: string);
    /**
     * List folders for a project
     */
    listFolders(request: ListFoldersRequest): Promise<ListFoldersResponse>;
    /**
     * Get folder details
     */
    getFolderDetails(folderId: string): Promise<any>;
    /**
     * Create a new folder
     */
    createFolder(request: CreateFolderRequest): Promise<CreateFolderResponse>;
    /**
     * Update folder
     */
    updateFolder(request: UpdateFolderRequest): Promise<UpdateFolderResponse>;
    /**
     * Move folder to new parent
     */
    moveFolder(request: MoveFolderRequest): Promise<MoveFolderResponse>;
    /**
     * Delete folder
     */
    deleteFolder(folderId: string): Promise<DeleteFolderResponse>;
    /**
     * Build folder tree from flat list
     */
    buildFolderTree(folders: Folder[]): FolderTreeNode[];
    /**
     * Duplicate folder
     */
    duplicateFolder(folderId: string, newName: string, newParentId?: string): Promise<CreateFolderResponse>;
    /**
     * Get folder statistics
     */
    getFolderStats(projectId: string): Promise<FolderStats>;
    /**
     * Export folder structure
     */
    exportFolderStructure(projectId: string): Promise<string>;
    /**
     * Validate create folder request
     */
    private validateCreateRequest;
    /**
     * Validate update folder request
     */
    private validateUpdateRequest;
}
