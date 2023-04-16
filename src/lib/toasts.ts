import { toast } from 'react-hot-toast';

export const notifyCopyLink = (link: string, icon: JSX.Element) => {
  toast('Link copied to clipboard.', {
    duration: 2000,
    position: 'top-center',
    className: 'text-white text-sm max-w-fit',
    icon: icon,
    style: {
      backgroundColor: '#1f2937',
      color: 'white',
    },
  });
  navigator.clipboard.writeText(link);
};

export const notifyDelete = (icon: JSX.Element) => {
  toast('Record deleted successfully.', {
    duration: 2000,
    position: 'top-center',
    className: 'text-white text-sm max-w-fit',
    icon: icon,
    style: {
      backgroundColor: '#1f2937',
      color: 'white',
    },
  });
};

export const notifyCreate = (icon: JSX.Element) => {
  toast('Record created successfully.', {
    duration: 2000,
    position: 'top-center',
    className: 'text-white text-sm max-w-fit',
    icon: icon,
    style: {
      backgroundColor: '#1f2937',
      color: 'white',
    },
  });
};
