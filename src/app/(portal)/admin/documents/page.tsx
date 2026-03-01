"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Settings,
  LogOut,
  School,
  Shield,
  FileText,
  BarChart3,
  Plus,
  Download,
  Upload,
  Search,
  Folder,
  File,
  Image,
  FileVideo,
  Eye,
  Trash2,
  MoreVertical,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const folders = [
  { id: "1", name: "Policies", icon: Folder, files: 8, color: "text-blue-500" },
  { id: "2", name: "Curriculum Materials", icon: Folder, files: 24, color: "text-green-500" },
  { id: "3", name: "Forms & Templates", icon: Folder, files: 12, color: "text-purple-500" },
  { id: "4", name: "Training Resources", icon: Folder, files: 15, color: "text-amber-500" },
]

const recentDocuments = [
  { id: "1", name: "Safeguarding Policy 2026.pdf", type: "pdf", size: "2.4 MB", modified: "Feb 28, 2026", folder: "Policies" },
  { id: "2", name: "FS1 Curriculum Guide.pdf", type: "pdf", size: "5.1 MB", modified: "Feb 25, 2026", folder: "Curriculum Materials" },
  { id: "3", name: "Parent Registration Form.docx", type: "doc", size: "156 KB", modified: "Feb 20, 2026", folder: "Forms & Templates" },
  { id: "4", name: "Teacher Training Slides.pptx", type: "ppt", size: "8.3 MB", modified: "Feb 18, 2026", folder: "Training Resources" },
  { id: "5", name: "Emergency Contact Template.xlsx", type: "excel", size: "45 KB", modified: "Feb 15, 2026", folder: "Forms & Templates" },
  { id: "6", name: "Children Worship Video.mp4", type: "video", size: "124 MB", modified: "Feb 10, 2026", folder: "Training Resources" },
  { id: "7", name: "Class Photo Guidelines.pdf", type: "pdf", size: "890 KB", modified: "Feb 5, 2026", folder: "Policies" },
  { id: "8", name: "Memory Verse Cards.pdf", type: "pdf", size: "3.2 MB", modified: "Feb 1, 2026", folder: "Curriculum Materials" },
]

const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <FileText className="w-5 h-5 text-red-500" />
    case "doc":
      return <FileText className="w-5 h-5 text-blue-500" />
    case "ppt":
      return <FileText className="w-5 h-5 text-orange-500" />
    case "excel":
      return <FileText className="w-5 h-5 text-green-500" />
    case "video":
      return <FileVideo className="w-5 h-5 text-purple-500" />
    case "image":
      return <Image className="w-5 h-5 text-pink-500" />
    default:
      return <File className="w-5 h-5 text-slate-500" />
  }
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Children", href: "/admin/children" },
  { icon: GraduationCap, label: "Teachers", href: "/admin/teachers" },
  { icon: School, label: "Classes", href: "/admin/classes" },
  { icon: BookOpen, label: "Curriculum", href: "/admin/curriculum" },
  { icon: Calendar, label: "Schedule", href: "/admin/schedule" },
  { icon: BarChart3, label: "Reports", href: "/admin/reports" },
  { icon: FileText, label: "Documents", href: "/admin/documents", active: true },
  { icon: Shield, label: "Safeguarding", href: "/admin/safeguarding" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminDocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDocuments = recentDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-slate-900 text-white hidden lg:block">
        <div className="p-4 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold">TCG Admin</h1>
              <p className="text-xs text-slate-400">Management Portal</p>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                item.active
                  ? "bg-amber-500 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-white" asChild>
            <Link href="/login">
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Documents</h1>
            <p className="text-slate-500">Manage files and resources</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Folder className="w-4 h-4 mr-2" />
              New Folder
            </Button>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
          </div>
        </div>

        {/* Storage Stats */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Storage Used</p>
                <p className="text-2xl font-bold text-slate-800">2.4 GB <span className="text-sm font-normal text-slate-400">of 10 GB</span></p>
              </div>
              <div className="w-48">
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "24%" }} />
                </div>
                <p className="text-xs text-slate-400 mt-1 text-right">24% used</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Folders */}
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Folders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {folders.map((folder) => (
            <Card key={folder.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Folder className={`w-10 h-10 ${folder.color}`} />
                  <div>
                    <h3 className="font-medium text-slate-800">{folder.name}</h3>
                    <p className="text-sm text-slate-500">{folder.files} files</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Documents */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Documents</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search documents..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Folder</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Size</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Modified</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {getFileIcon(doc.type)}
                          <span className="font-medium text-slate-800">{doc.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{doc.folder}</Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{doc.size}</td>
                      <td className="py-3 px-4 text-slate-500 text-sm">{doc.modified}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
