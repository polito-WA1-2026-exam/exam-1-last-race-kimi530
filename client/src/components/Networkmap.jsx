function NetworkMap({ showLines = true }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '760px', padding: '20px', fontFamily: 'sans-serif' }}>

      {showLines && <>
        {/* GREEN LINE */}
        <div style={{ position: 'absolute', background: '#4CAF50', left: 89, top: 131, width: 131, height: 6, borderRadius: 3 }}/>
        <div style={{ position: 'absolute', background: '#4CAF50', left: 219, top: 131, width: 131, height: 6, borderRadius: 3 }}/>
        <div style={{ position: 'absolute', background: '#4CAF50', left: 349, top: 131, width: 131, height: 6, borderRadius: 3 }}/>
        <div style={{ position: 'absolute', background: '#4CAF50', left: 479, top: 131, width: 131, height: 6, borderRadius: 3 }}/>

        {/* BLUE LINE */}
        <div style={{ position: 'absolute', background: '#2196F3', left: 80, top: 149, width: 6, height: 121, borderRadius: 3 }}/>
        <div style={{ position: 'absolute', background: '#2196F3', left: 80, top: 289, width: 6, height: 121, borderRadius: 3 }}/>
        <div style={{ position: 'absolute', background: '#2196F3', left: 80, top: 429, width: 6, height: 121, borderRadius: 3 }}/>
        <div style={{ position: 'absolute', background: '#2196F3', left: 80, top: 569, width: 6, height: 121, borderRadius: 3 }}/>

        {/* YELLOW LINE */}
        <div style={{ position: 'absolute', background: '#FFC107', left: 214, top: 134, width: 152, height: 6, transform: 'rotate(43deg)', transformOrigin: 'left center' }}/>
        <div style={{ position: 'absolute', background: '#FFC107', left: 89, top: 271, width: 131, height: 6, borderRadius: 3 }}/>
        <div style={{ position: 'absolute', background: '#FFC107', left: 210, top: 289, width: 6, height: 121, borderRadius: 3 }}/>
        <div style={{ position: 'absolute', background: '#FFC107', left: 210, top: 429, width: 6, height: 121, borderRadius: 3 }}/>

        {/* PINK LINE */}
        <div style={{ position: 'absolute', background: '#E91E63', left: 219, top: 261, width: 268, height: 6, transform: 'rotate(-27deg)', transformOrigin: 'left center' }}/>
        <div style={{ position: 'absolute', background: '#E91E63', left: 219, top: 271, width: 131, height: 6, borderRadius: 3 }}/>
        <div style={{ position: 'absolute', background: '#E91E63', left: 340, top: 289, width: 6, height: 121, borderRadius: 3 }}/>
        <div style={{ position: 'absolute', background: '#E91E63', left: 340, top: 429, width: 6, height: 121, borderRadius: 3 }}/>
      </>}

      {/* REGULAR STATIONS */}
      {[
        { name: 'Eram Sabz',   left: 331, top: 116, color: '#4CAF50' },
        { name: 'Ekbatan',     left: 601, top: 116, color: '#4CAF50' },
        { name: 'Tajrish',     left: 71,  top: 396, color: '#2196F3' },
        { name: 'Gheitarie',   left: 71,  top: 536, color: '#2196F3' },
        { name: 'Gholhak',     left: 71,  top: 676, color: '#2196F3' },
        { name: 'Nabard',      left: 201, top: 396, color: '#FFC107' },
        { name: 'Piroozi',     left: 201, top: 536, color: '#FFC107' },
        { name: 'Amir Kabir',  left: 331, top: 396, color: '#E91E63' },
        { name: 'Molavi',      left: 331, top: 536, color: '#E91E63' },
        { name: 'Khayam',      left: 331, top: 676, color: '#E91E63' },
      ].map(s => (
        <div key={s.name} style={{ position: 'absolute', left: s.left, top: s.top, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: s.color, border: '3px solid white', boxShadow: '0 0 0 2px #ccc', zIndex: 2 }}/>
          <div style={{ fontSize: 11, marginTop: 4, whiteSpace: 'nowrap', fontWeight: 500 }}>{s.name}</div>
        </div>
      ))}

      {/* INTERCHANGE STATIONS */}
      {[
        { name: 'Chitgar',  left: 71,  top: 116, c1: '#4CAF50', c2: '#2196F3' },
        { name: 'Azadi',    left: 201, top: 116, c1: '#4CAF50', c2: '#FFC107' },
        { name: 'Bime',     left: 461, top: 116, c1: '#4CAF50', c2: '#E91E63' },
        { name: 'Mirdamad', left: 71,  top: 256, c1: '#2196F3', c2: '#FFC107' },
        { name: 'Saadi',    left: 201, top: 256, c1: '#FFC107', c2: '#E91E63' },
      ].map(s => (
        <div key={s.name} style={{ position: 'absolute', left: s.left, top: s.top, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: 24, height: 24, borderRadius: '50%',
            background: `conic-gradient(${s.c1} 0deg 180deg, ${s.c2} 180deg 360deg)`,
            border: '3px solid white', boxShadow: '0 0 0 2px #888', zIndex: 2
          }}/>
          <div style={{ fontSize: 11, marginTop: 4, whiteSpace: 'nowrap', fontWeight: 600 }}>{s.name}</div>
        </div>
      ))}

      {/* LEGEND */}
      {showLines && (
        <div style={{ position: 'absolute', right: 20, top: 20, background: 'rgba(0,0,0,0.05)', padding: 12, borderRadius: 8, fontSize: 12 }}>
          {[
            { color: '#4CAF50', name: 'Green' },
            { color: '#2196F3', name: 'Blue' },
            { color: '#FFC107', name: 'Yellow' },
            { color: '#E91E63', name: 'Pink' },
          ].map(l => (
            <div key={l.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 20, height: 5, background: l.color, borderRadius: 2 }}/>
              <span>{l.name} line</span>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'conic-gradient(#4CAF50 0deg 180deg,#2196F3 180deg)', border: '2px solid white', boxShadow: '0 0 0 1px #888' }}/>
            <span>Interchange</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#888', border: '2px solid white' }}/>
            <span>Station</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default NetworkMap;