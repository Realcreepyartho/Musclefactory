/*
 * MUSCLE FACTORY GYM — owner-editable configuration
 * Update contact details, address, hours, map, rating or plan amounts here.
 * The visible HTML has matching fallback text if JavaScript is unavailable.
 */
(function () {
  'use strict';
  const config = {
    gymName: 'MUSCLE FACTORY GYM',
    clubType: 'Fitness & Recovery Club',
    phoneDisplay: '+91 70168 29247',
    phoneDial: '+917016829247',
    whatsappNumber: '917016829247',
    address: '2nd Floor, Shree Krishna AC Mall, Behind SMC Community Hall, Near Flower Garden Road, Royal Star Township, Dindoli, Surat, Gujarat 394210',
    addressShort: '2nd Floor, Shree Krishna AC Mall, Dindoli, Surat 394210',
    hoursShort: 'Mon – Sat: 5:30 AM – 10:00 PM | Sun: Closed',
    hoursFull: 'Monday to Saturday: 5:30 AM – 10:00 PM | Sunday: Closed',
    ratingText: '4.8★ on Google Maps (248+ Verified Reviews)',
    ratingValue: '4.8',
    reviewCount: '248+ Verified Reviews',
    mapsEmbedUrl: 'https://maps.google.com/maps?q=Muscle+Factory+Gym,+Shree+Krishna+AC+Mall,+Behind+SMC+Community+Hall,+Near+Flower+Garden+Road,+Royal+Star+Township,+Dindoli,+Surat,+Gujarat+394210&t=&z=16&ie=UTF8&iwloc=&output=embed',
    mapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Muscle+Factory+Gym%2C+Shree+Krishna+AC+Mall%2C+Dindoli%2C+Surat%2C+Gujarat+394210',
    defaultWhatsAppMessage: 'Hi Muscle Factory Gym! I saw your website and I want to enquire about membership plans and the free trial pass.',
    trialWhatsAppMessage: 'Hi Muscle Factory Gym! I would like to enquire about claiming a free trial pass.',
    membershipPlans: {
      womenAnnual: {
        name: "Women's Annual Offer",
        offerPrice: '₹8,999/-',
        regularPrice: '₹15,000/-',
        offerLabel: 'Limited to First 100 Members',
        whatsappMessage: "Hi Muscle Factory Gym! I would like to enquire about the Women's Annual Offer (₹8,999/-). Please share the details."
      },
      menAnnual: {
        name: "Men's Annual Offer",
        offerPrice: '₹9,999/-',
        regularPrice: '₹18,000/-',
        offerLabel: 'Limited to First 100 Members',
        whatsappMessage: "Hi Muscle Factory Gym! I would like to enquire about the Men's Annual Offer (₹9,999/-). Please share the details."
      },
      monthlyTrial: {
        name: 'Monthly / Trial Access',
        rateText: 'Contact Reception for 1, 3, or 6-Month customized rates',
        offerLabel: 'Flexible Plans',
        whatsappMessage: 'Hi Muscle Factory Gym! I would like to enquire about the 1, 3, or 6-month membership and trial options.'
      }
    }
  };
  window.MF_GYM_CONFIG = Object.freeze(config);
})();
