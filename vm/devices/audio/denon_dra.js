var devices = {};
var id = 0;

function DenonDRA(addr) {
    this.id = id++;
    devices[this.id] = this;
    _init_dra(this.id, addr);
    
}

DenonDRA.prototype = {
    setMasterVolume: function (val) {
        _dra_master_volume(this.id, val);
    },
    setPower: function (val) {
        _dra_power(this.id, val);
    },
    setMute: function (val) {
        _dra_mute(this.id, val);
    },
    send: function (val) {
        _dra_send(this.id, val);
    },
    close: function () {
        _close_dra(this.id);
    }
};

DenonDRA._update = function (id, data) {
    var dra = devices[id];
    if (dra && dra.onupdate) {
        dra.onupdate(data);
    }
};

DenonDRA._error = function (id, data) {
    var dra = devices[id];
    if (dra && dra.onerror) {
        dra.onerror(data);
    }
};

DenonDRA._connect = function (id) {
    var dra = devices[id];
    if (dra && dra.onconnect) {
        dra.onconnect();
    }
};

DenonDRA._close = function (id) {
    var dra = devices[id];
    if (dra && dra.onclose) {
        dra.onclose();
    }
    delete devices[id];
};

module.exports = DenonDRA;
