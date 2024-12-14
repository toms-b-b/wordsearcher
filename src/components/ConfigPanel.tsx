import React from 'react';
import { Upload, Download } from 'lucide-react';
import { PAGE_SIZES, FONT_OPTIONS, MIN_GRID_SIZE, MAX_GRID_SIZE } from '../utils/constants';
import { PuzzleConfig } from '../types';

interface ConfigPanelProps {
  config: any;
  setConfig: (config: any) => void;
  regeneratePuzzles: () => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDownload: () => void;
  puzzles: PuzzleConfig[];
}

export function ConfigPanel({
  config,
  setConfig,
  regeneratePuzzles,
  handleFileUpload,
  handleDownload,
  puzzles
}: ConfigPanelProps) {
  const handleConfigChange = (key: string, value: any) => {
    setConfig((prev: any) => ({ ...prev, [key]: value }));
    regeneratePuzzles();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h1 className="text-3xl font-bold mb-6">Word Search Generator</h1>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload CSV File
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
              <Upload className="w-5 h-5 mr-2" />
              Choose File
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            {puzzles.length > 0 && (
              <button
                onClick={handleDownload}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <Download className="w-5 h-5 mr-2" />
                Download All PDFs
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font
            </label>
            <select
              value={config.font.label}
              onChange={(e) => {
                const font = FONT_OPTIONS.find(f => f.label === e.target.value);
                if (font) handleConfigChange('font', font);
              }}
              className="w-full px-3 py-2 border rounded-md"
            >
              {FONT_OPTIONS.map(font => (
                <option key={font.label} value={font.label}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Page Size
            </label>
            <select
              value={config.pageSize.label}
              onChange={(e) => {
                const size = PAGE_SIZES.find(s => s.label === e.target.value);
                if (size) handleConfigChange('pageSize', size);
              }}
              className="w-full px-3 py-2 border rounded-md"
            >
              {PAGE_SIZES.map(size => (
                <option key={size.label} value={size.label}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grid Size
            </label>
            <input
              type="number"
              min={MIN_GRID_SIZE}
              max={MAX_GRID_SIZE}
              value={config.gridSize}
              onChange={(e) => handleConfigChange('gridSize', Math.max(MIN_GRID_SIZE, Math.min(MAX_GRID_SIZE, parseInt(e.target.value))))}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Size
            </label>
            <input
              type="number"
              min={8}
              max={24}
              value={config.fontSize}
              onChange={(e) => handleConfigChange('fontSize', parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}