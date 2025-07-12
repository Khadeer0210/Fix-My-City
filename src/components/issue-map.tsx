"use client";

import * as React from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import type { Issue } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

interface IssueMapProps {
  issues: Issue[];
}

export function IssueMap({ issues }: IssueMapProps) {
  const [popupInfo, setPopupInfo] = React.useState<Issue | null>(null);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="w-full aspect-[16/9] md:aspect-[2/1] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-destructive">Mapbox token is not configured. Please add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to your environment variables.</p>
      </div>
    );
  }

  const averageLat = issues.length > 0 ? issues.reduce((acc, issue) => acc + issue.location.lat, 0) / issues.length : 40;
  const averageLng = issues.length > 0 ? issues.reduce((acc, issue) => acc + issue.location.lng, 0) / issues.length : -74.5;

  return (
    <Card>
      <CardContent className="p-0">
        <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-lg overflow-hidden">
          <Map
            initialViewState={{
              longitude: averageLng,
              latitude: averageLat,
              zoom: 10,
            }}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            <NavigationControl position="top-right" />
            {issues.map(issue => (
              <Marker
                key={issue.id}
                longitude={issue.location.lng}
                latitude={issue.location.lat}
                onClick={e => {
                  e.originalEvent.stopPropagation();
                  setPopupInfo(issue);
                }}
              >
                <MapPin className="text-primary h-8 w-8 cursor-pointer drop-shadow-lg" fill="currentColor" />
              </Marker>
            ))}
            
            {popupInfo && (
              <Popup
                anchor="top"
                longitude={popupInfo.location.lng}
                latitude={popupInfo.location.lat}
                onClose={() => setPopupInfo(null)}
                closeOnClick={false}
              >
                <div className="w-64">
                   <div className="relative h-32 w-full mb-2">
                     <Image src={popupInfo.imageUrl} alt={popupInfo.title} layout="fill" objectFit="cover" className="rounded-t-lg" data-ai-hint="issue image" />
                   </div>
                   <div className="p-2">
                     <h3 className="font-bold text-md mb-1">{popupInfo.title}</h3>
                     <p className="text-xs text-muted-foreground">{popupInfo.category}</p>
                     <p className="text-sm mt-1">{popupInfo.description.substring(0, 50)}...</p>
                     <Button size="sm" className="w-full mt-2">View Details</Button>
                   </div>
                </div>
              </Popup>
            )}
          </Map>
        </div>
      </CardContent>
    </Card>
  );
}
