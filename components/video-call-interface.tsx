"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Monitor,
  MessageSquare,
  Settings,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface VideoCallInterfaceProps {
  doctorName: string
  patientName: string
  userType: "doctor" | "patient"
  appointmentId: string
  onEndCall: () => void
}

interface ChatMessage {
  id: number
  sender: string
  message: string
  timestamp: string
  type: "doctor" | "patient"
}

export function VideoCallInterface({
  doctorName,
  patientName,
  userType,
  appointmentId,
  onEndCall,
}: VideoCallInterfaceProps) {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [callDuration, setCallDuration] = useState(0)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: userType === "doctor" ? patientName : doctorName,
      message: "Hello! I can see and hear you clearly.",
      timestamp: "10:30 AM",
      type: userType === "doctor" ? "patient" : "doctor",
    },
  ])

  const currentUser = userType === "doctor" ? doctorName : patientName
  const otherUser = userType === "doctor" ? patientName : doctorName

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: ChatMessage = {
        id: chatMessages.length + 1,
        sender: currentUser,
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: userType,
      }
      setChatMessages([...chatMessages, newMessage])
      setChatMessage("")
    }
  }

  const handleEndCall = () => {
    if (window.confirm("Are you sure you want to end this call?")) {
      onEndCall()
    }
  }

  return (
    <div className={`fixed inset-0 bg-gray-900 z-50 flex flex-col ${isFullscreen ? "p-0" : "p-4"}`}>
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Connected</span>
          </div>
          <Separator orientation="vertical" className="h-6 bg-white/20" />
          <div className="text-sm">
            <span className="font-medium">Duration: {formatDuration(callDuration)}</span>
          </div>
          <Separator orientation="vertical" className="h-6 bg-white/20" />
          <div className="text-sm">
            <span>Appointment ID: {appointmentId}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-white/20 text-white">
            {userType === "doctor" ? "Doctor" : "Patient"}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="text-white hover:bg-white/20"
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 flex">
        {/* Video Streams */}
        <div className="flex-1 relative">
          {/* Remote Video (Other User) */}
          <div className="w-full h-full bg-gray-800 relative rounded-lg overflow-hidden">
            {isVideoOn ? (
              <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-white/20">
                    <AvatarImage src="/placeholder.svg?height=128&width=128" alt={otherUser} />
                    <AvatarFallback className="text-2xl bg-blue-600">
                      {otherUser
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">{otherUser}</h3>
                  <p className="text-blue-200">{userType === "doctor" ? "Patient" : "Doctor"}</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <VideoOff className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-400">Camera is off</p>
                </div>
              </div>
            )}

            {/* Local Video (Picture-in-Picture) */}
            <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-white/20">
              {isVideoOn ? (
                <div className="w-full h-full bg-gradient-to-br from-green-900 to-teal-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Avatar className="h-16 w-16 mx-auto mb-2 border-2 border-white/20">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" alt={currentUser} />
                      <AvatarFallback className="bg-green-600">
                        {currentUser
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-xs font-medium">You</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <VideoOff className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>

            {/* Screen Sharing Indicator */}
            {isScreenSharing && (
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Monitor className="h-4 w-4 mr-2" />
                Screen Sharing
              </div>
            )}
          </div>
        </div>

        {/* Chat Panel */}
        {showChat && (
          <Card className="w-80 m-4 flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-semibold flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </h3>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === userType ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        msg.type === userType ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="text-sm"
                />
                <Button size="sm" onClick={handleSendMessage}>
                  Send
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Control Bar */}
      <div className="bg-white/10 backdrop-blur-sm p-4">
        <div className="flex items-center justify-center space-x-4">
          {/* Audio Control */}
          <Button
            variant={isAudioOn ? "secondary" : "destructive"}
            size="lg"
            onClick={() => setIsAudioOn(!isAudioOn)}
            className="rounded-full w-12 h-12"
          >
            {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>

          {/* Video Control */}
          <Button
            variant={isVideoOn ? "secondary" : "destructive"}
            size="lg"
            onClick={() => setIsVideoOn(!isVideoOn)}
            className="rounded-full w-12 h-12"
          >
            {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>

          {/* Screen Share */}
          <Button
            variant={isScreenSharing ? "default" : "secondary"}
            size="lg"
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className="rounded-full w-12 h-12"
          >
            <Monitor className="h-5 w-5" />
          </Button>

          {/* Speaker Control */}
          <Button
            variant={isSpeakerOn ? "secondary" : "destructive"}
            size="lg"
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className="rounded-full w-12 h-12"
          >
            {isSpeakerOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>

          {/* Chat Toggle */}
          <Button
            variant={showChat ? "default" : "secondary"}
            size="lg"
            onClick={() => setShowChat(!showChat)}
            className="rounded-full w-12 h-12"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>

          {/* Settings */}
          <Button variant="secondary" size="lg" className="rounded-full w-12 h-12">
            <Settings className="h-5 w-5" />
          </Button>

          {/* End Call */}
          <Button
            variant="destructive"
            size="lg"
            onClick={handleEndCall}
            className="rounded-full w-12 h-12 bg-red-600 hover:bg-red-700"
          >
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center justify-center space-x-6 mt-4 text-white text-sm">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isAudioOn ? "bg-green-500" : "bg-red-500"}`}></div>
            <span>{isAudioOn ? "Microphone On" : "Microphone Off"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isVideoOn ? "bg-green-500" : "bg-red-500"}`}></div>
            <span>{isVideoOn ? "Camera On" : "Camera Off"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>Connection: Excellent</span>
          </div>
        </div>
      </div>
    </div>
  )
}
