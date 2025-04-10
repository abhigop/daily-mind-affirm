
import React, { useState } from 'react';
import { topics } from '@/data/affirmations';
import { useUser } from '@/context/UserContext';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Lock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const TopicsPage = () => {
  const { userData, toggleFollowTopic } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleToggleFollow = (topicId: string, isPremium: boolean) => {
    if (isPremium) {
      toast('Premium topics require a subscription', {
        description: 'Upgrade to Premium to unlock all topics.'
      });
      return;
    }
    
    toggleFollowTopic(topicId);
  };
  
  const filteredTopics = topics.filter(topic => 
    topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="app-container pb-20">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Topics</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics..."
            className="pl-10"
          />
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">Most Popular</h2>
          <div className="space-y-3">
            {filteredTopics
              .filter(topic => topic.isPopular)
              .map(topic => (
                <div 
                  key={topic.id}
                  className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm"
                >
                  <div>
                    <h3 className="font-medium">{topic.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{topic.description}</p>
                  </div>
                  
                  <div className="flex items-center">
                    {topic.isPremium && (
                      <Lock className="h-4 w-4 text-gray-400 mr-2" />
                    )}
                    <Button
                      variant={userData.followedTopics.includes(topic.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleToggleFollow(topic.id, topic.isPremium)}
                    >
                      {userData.followedTopics.includes(topic.id) ? 'Following' : 'Follow'}
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-3">All Topics</h2>
          <div className="space-y-3">
            {filteredTopics
              .filter(topic => !topic.isPopular)
              .map(topic => (
                <div 
                  key={topic.id}
                  className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm"
                >
                  <div>
                    <h3 className="font-medium">{topic.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{topic.description}</p>
                  </div>
                  
                  <div className="flex items-center">
                    {topic.isPremium && (
                      <Lock className="h-4 w-4 text-gray-400 mr-2" />
                    )}
                    <Button
                      variant={userData.followedTopics.includes(topic.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleToggleFollow(topic.id, topic.isPremium)}
                    >
                      {userData.followedTopics.includes(topic.id) ? 'Following' : 'Follow'}
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default TopicsPage;
