
"use client";

import { useState } from 'react';
import type { Notification } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Bell, Check, Trash2, CheckCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from './ui/badge';

interface NotificationPanelProps {
  notifications: Notification[];
  onNotificationsChange: (notifications: Notification[]) => void;
}

export function NotificationPanel({ notifications, onNotificationsChange }: NotificationPanelProps) {
  const handleMarkAsRead = (id: string) => {
    onNotificationsChange(
      notifications.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllRead = () => {
    onNotificationsChange(
      notifications.map(n => ({ ...n, read: true }))
    );
  };

  const handleClearAll = () => {
    onNotificationsChange([]);
  };

  return (
    <Card className="w-full md:w-[400px] border-0 md:border shadow-none md:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-headline flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Notifications
        </CardTitle>
        <div className="flex items-center gap-2">
           <Button variant="ghost" size="sm" onClick={handleMarkAllRead} disabled={notifications.every(n => n.read)}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark all read
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 max-h-[400px] overflow-y-auto">
        <div className="flex flex-col">
          <AnimatePresence>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-t p-4 transition-colors duration-300 ${notification.read ? 'bg-background' : 'bg-primary/5'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full ${notification.read ? 'bg-muted-foreground/50' : 'bg-accent animate-pulse'}`}></div>
                    <div className="flex-grow">
                      <p className="font-semibold">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                      <p className="text-xs text-muted-foreground/80 mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 flex-shrink-0"
                        onClick={() => handleMarkAsRead(notification.id)}
                        aria-label="Mark as read"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-muted-foreground p-8"
              >
                <Bell className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
                <p>No new notifications</p>
                <p className="text-sm">You're all caught up!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
       {notifications.length > 0 && (
         <CardFooter className="py-2 border-t">
            <Button variant="ghost" size="sm" className="w-full text-destructive hover:text-destructive" onClick={handleClearAll}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear all notifications
            </Button>
          </CardFooter>
       )}
    </Card>
  );
}
