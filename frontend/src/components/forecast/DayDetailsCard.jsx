const DayDetailsCard = ({ day, dayName }) => {
  if (!day) return null;

  const details = [
    {
      label: 'High',
      value: `${day.tempMax}°C`,
      icon: 'M5 10l7-7m0 0l7 7m-7-7v18',
      gradient: 'from-red-50 to-orange-50',
      border: 'border-red-100',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-500',
    },
    {
      label: 'Low',
      value: `${day.tempMin}°C`,
      icon: 'M19 14l-7 7m0 0l-7-7m7 7V3',
      gradient: 'from-blue-50 to-cyan-50',
      border: 'border-blue-100',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-500',
    },
    {
      label: 'Humidity',
      value: `${day.humidity}%`,
      icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707',
      gradient: 'from-teal-50 to-emerald-50',
      border: 'border-teal-100',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-500',
    },
    {
      label: 'Wind',
      value: `${day.windSpeed.toFixed(1)} m/s`,
      icon: 'M14 5l7 7m0 0l-7 7m7-7H3',
      gradient: 'from-purple-50 to-indigo-50',
      border: 'border-purple-100',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-500',
    },
  ];

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {dayName} Details
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {details.map((detail, index) => (
          <div 
            key={index}
            className={`bg-gradient-to-br ${detail.gradient} rounded-2xl p-4 border ${detail.border}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 ${detail.iconBg} rounded-lg`}>
                <svg className={`w-5 h-5 ${detail.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={detail.icon} />
                </svg>
              </div>
              <span className="text-sm text-gray-500">{detail.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{detail.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayDetailsCard;
