"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, CheckCircle2, Clock, Plus, Target, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<{ name: string }>()

  useEffect(() => {
    const fetchUser = async () => {
      if (status !== 'authenticated') return

      try {
        const response = await fetch('/api/profile', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) throw new Error('Failed to fetch profile')
        const data = await response.json()
        setUser(data)
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }
    fetchUser()
  }, [status])

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Dashboard
        </h1>
        <p className="text-gray-400">
          Welcome back{user?.name ? `, ${user.name}` : ''}! Here's an overview of your goals and commitments.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-black/40 border-gray-800/30 backdrop-blur-xl hover:bg-black/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Active Goals
            </CardTitle>
            <Target className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">7</div>
            <p className="text-xs text-gray-400">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-black/40 border-gray-800/30 backdrop-blur-xl hover:bg-black/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Commitments
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">23</div>
            <p className="text-xs text-gray-400">12 completed this week</p>
          </CardContent>
        </Card>
        <Card className="bg-black/40 border-gray-800/30 backdrop-blur-xl hover:bg-black/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Upcoming
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">5</div>
            <p className="text-xs text-gray-400">Due in the next 24 hours</p>
          </CardContent>
        </Card>
        <Card className="bg-black/40 border-gray-800/30 backdrop-blur-xl hover:bg-black/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Completion Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">78%</div>
            <p className="text-xs text-gray-400">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="goals" className="w-full">
        <TabsList className="bg-black/40 border border-gray-800/30 backdrop-blur-xl">
          <TabsTrigger value="goals" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Goals
          </TabsTrigger>
          <TabsTrigger value="commitments" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Commitments
          </TabsTrigger>
          <TabsTrigger value="calendar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Calendar
          </TabsTrigger>
        </TabsList>
        <TabsContent value="goals" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Your Goals
            </h2>
            <Link href="/dashboard/goals/new">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                <Plus className="mr-2 h-4 w-4" /> Add Goal
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Run a marathon",
                category: "Health",
                progress: 65,
                dueDate: "Dec 15, 2023",
              },
              {
                title: "Learn Spanish",
                category: "Education",
                progress: 40,
                dueDate: "Ongoing",
              },
              {
                title: "Read 20 books",
                category: "Personal",
                progress: 25,
                dueDate: "Dec 31, 2023",
              },
              {
                title: "Launch side project",
                category: "Career",
                progress: 80,
                dueDate: "Nov 30, 2023",
              },
              {
                title: "Save for vacation",
                category: "Finance",
                progress: 50,
                dueDate: "Mar 1, 2024",
              },
            ].map((goal, i) => (
              <Card key={i} className="bg-black/40 border-gray-800/30 backdrop-blur-xl hover:bg-black/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                      {goal.title}
                    </CardTitle>
                    <span className="rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-2 py-1 text-xs font-medium text-blue-400">
                      {goal.category}
                    </span>
                  </div>
                  <CardDescription className="text-gray-400">Due: {goal.dueDate}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-sm font-medium text-gray-400">Progress</span>
                    <span className="text-sm font-medium text-gray-400">{goal.progress}%</span>
                  </div>
                  <Progress 
                    value={goal.progress} 
                    className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-blue-600 [&>div]:to-purple-600 bg-gray-800" 
                  />
                </CardContent>
                <CardFooter>
                  <Link href={`/dashboard/goals/${i}`} className="w-full">
                    <Button variant="outline" className="w-full border-gray-800/30 hover:bg-white/10 text-gray-400 hover:text-white">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="commitments" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Your Commitments
            </h2>
            <Link href="/dashboard/commitments/new">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                <Plus className="mr-2 h-4 w-4" /> Add Commitment
              </Button>
            </Link>
          </div>
          <Card className="bg-black/40 border-gray-800/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Today's Commitments
              </CardTitle>
              <CardDescription className="text-gray-400">Your scheduled commitments for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Morning run",
                    time: "6:00 AM",
                    completed: true,
                    goal: "Run a marathon",
                  },
                  {
                    title: "Spanish lesson",
                    time: "9:00 AM",
                    completed: true,
                    goal: "Learn Spanish",
                  },
                  {
                    title: "Project meeting",
                    time: "2:00 PM",
                    completed: false,
                    goal: "Launch side project",
                  },
                  {
                    title: "Read for 30 minutes",
                    time: "8:00 PM",
                    completed: false,
                    goal: "Read 20 books",
                  },
                ].map((commitment, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border border-gray-800/30 bg-black/40 backdrop-blur-xl p-4 hover:bg-black/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          commitment.completed 
                            ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400" 
                            : "bg-gray-800/50 text-gray-400"
                        }`}
                      >
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className={`font-medium text-white ${commitment.completed ? "line-through opacity-70" : ""}`}>
                          {commitment.title}
                        </p>
                        <div className="flex items-center text-sm text-gray-400">
                          <Clock className="mr-1 h-3 w-3" />
                          {commitment.time}
                          <span className="mx-1">•</span>
                          <span>{commitment.goal}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={commitment.completed 
                        ? "text-gray-400 hover:text-white hover:bg-white/10" 
                        : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                      }
                    >
                      {commitment.completed ? "Completed" : "Mark Complete"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="calendar" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Calendar
            </h2>
            <Link href="/dashboard/calendar">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                <CalendarDays className="mr-2 h-4 w-4" /> Full Calendar
              </Button>
            </Link>
          </div>
          <Card className="bg-black/40 border-gray-800/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Upcoming Schedule
              </CardTitle>
              <CardDescription className="text-gray-400">Your commitments for the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    day: "Today",
                    commitments: [
                      { title: "Morning run", time: "6:00 AM" },
                      { title: "Spanish lesson", time: "9:00 AM" },
                      { title: "Project meeting", time: "2:00 PM" },
                      { title: "Read for 30 minutes", time: "8:00 PM" },
                    ],
                  },
                  {
                    day: "Tomorrow",
                    commitments: [
                      { title: "Gym workout", time: "7:00 AM" },
                      { title: "Team standup", time: "10:00 AM" },
                      { title: "Budget review", time: "4:00 PM" },
                    ],
                  },
                ].map((day, i) => (
                  <div key={i} className="space-y-2">
                    <h3 className="font-semibold">{day.day}</h3>
                    <div className="space-y-2">
                      {day.commitments.map((commitment, j) => (
                        <div key={j} className="flex items-center justify-between rounded-lg border p-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <span>{commitment.title}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{commitment.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Team Goals</CardTitle>
            <CardDescription>Goals you&apos;re working on with others</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Complete project proposal",
                  team: "Marketing Team",
                  members: [
                    { name: "Alex", avatar: "/placeholder.svg?height=32&width=32" },
                    { name: "Taylor", avatar: "/placeholder.svg?height=32&width=32" },
                    { name: "Jordan", avatar: "/placeholder.svg?height=32&width=32" },
                  ],
                  progress: 75,
                },
                {
                  title: "Launch new feature",
                  team: "Development Team",
                  members: [
                    { name: "Casey", avatar: "/placeholder.svg?height=32&width=32" },
                    { name: "Riley", avatar: "/placeholder.svg?height=32&width=32" },
                  ],
                  progress: 40,
                },
              ].map((goal, i) => (
                <div key={i} className="space-y-2 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{goal.title}</h3>
                    <span className="text-sm text-muted-foreground">{goal.team}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {goal.members.map((member, j) => (
                        <Avatar key={j} className="border-2 border-background">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-sm font-medium">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Goal Insights</CardTitle>
            <CardDescription>Analytics and trends for your goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Weekly Completion Rate</h3>
                  <span className="text-sm font-medium text-green-600">+12%</span>
                </div>
                <div className="h-24 w-full rounded-lg bg-muted"></div>
                <p className="text-sm text-muted-foreground">
                  Your commitment completion rate has improved by 12% compared to last week.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Top Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { category: "Health", count: 4, color: "bg-blue-500" },
                    { category: "Career", count: 3, color: "bg-purple-500" },
                    { category: "Education", count: 2, color: "bg-green-500" },
                    { category: "Finance", count: 1, color: "bg-yellow-500" },
                  ].map((category, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className={`h-3 w-3 rounded-full ${category.color}`}></div>
                      <span className="text-sm">{category.category}</span>
                      <span className="text-sm text-muted-foreground">({category.count})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

